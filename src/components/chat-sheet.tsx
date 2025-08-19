
"use client";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from '@/components/ui/sheet';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { SendHorizonal, Phone } from 'lucide-react';
import type { Service } from '@/lib/types';
import React from 'react';
import { db } from '@/lib/firebase';
import { collection, query, orderBy, onSnapshot, addDoc, serverTimestamp, where, getDocs } from 'firebase/firestore';


interface ChatMessage {
    id: string;
    text: string;
    senderId: string;
    timestamp: any;
}


async function getOrCreateChatRoom(userId1: string, userId2: string, serviceId: string): Promise<string> {
    const chatRoomsRef = collection(db, "chatRooms");
    
    // Create a consistent ID for the chat room regardless of user order
    const members = [userId1, userId2].sort();
    const chatRoomId = `${serviceId}_${members[0]}_${members[1]}`;
    
    const q = query(chatRoomsRef, where("id", "==", chatRoomId));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
        // Create a new chat room
        await addDoc(chatRoomsRef, {
            id: chatRoomId,
            members: members,
            serviceId: serviceId,
            createdAt: serverTimestamp(),
        });
        return chatRoomId;
    } else {
        // Return existing chat room ID
        return querySnapshot.docs[0].id;
    }
}


export default function ChatSheet({
  open,
  onOpenChange,
  service,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  service: Service | null;
}) {
  const [messages, setMessages] = React.useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = React.useState("");
  const [chatRoomId, setChatRoomId] = React.useState<string | null>(null);
  
  // This is a placeholder for the current user. In a real app, this would come from an auth context.
  const currentUserId = "buyer-1"; 

  React.useEffect(() => {
    if (!open || !service) {
        setMessages([]);
        return;
    };

    const setupChat = async () => {
        const roomId = await getOrCreateChatRoom(currentUserId, service.providerId, service.id);
        setChatRoomId(roomId);

        const messagesRef = collection(db, "chatRooms", roomId, "messages");
        const q = query(messagesRef, orderBy("timestamp", "asc"));

        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const msgs = querySnapshot.docs.map(doc => ({id: doc.id, ...doc.data()} as ChatMessage));
            setMessages(msgs);
        });

        return () => unsubscribe();
    }

    setupChat();

  }, [open, service]);


  const handleSendMessage = async (e: React.FormEvent) => {
      e.preventDefault();
      if (!newMessage.trim() || !chatRoomId) return;

      const messagesRef = collection(db, "chatRooms", chatRoomId, "messages");
      await addDoc(messagesRef, {
          text: newMessage,
          senderId: currentUserId,
          timestamp: serverTimestamp()
      });

      setNewMessage("");
  }


  if (!service) return null;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="flex flex-col p-0 bg-card/80 backdrop-blur-sm">
        <SheetHeader className="p-6 pb-2">
          <div className="flex items-center gap-4">
             <Avatar>
              <AvatarImage src={`https://placehold.co/40x40.png`} alt={service.provider} />
              <AvatarFallback>{service.provider.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <SheetTitle className="font-headline">{service.provider}</SheetTitle>
              <SheetDescription className="font-body">
                Regarding: {service.title}
              </SheetDescription>
            </div>
            <Button size="icon" variant="ghost" className="ml-auto">
              <Phone className="h-5 w-5" />
            </Button>
          </div>
        </SheetHeader>
        <ScrollArea className="flex-1 px-6">
          <div className="space-y-4 py-4">
             {messages.map(msg => (
                 <div key={msg.id} className={`flex items-end gap-2 ${msg.senderId === currentUserId ? 'justify-end' : ''}`}>
                    <p className={`max-w-xs rounded-lg p-3 font-body ${msg.senderId === currentUserId ? 'bg-primary text-primary-foreground' : 'bg-secondary text-secondary-foreground'}`}>
                        {msg.text}
                    </p>
                 </div>
             ))}
          </div>
        </ScrollArea>
        <form onSubmit={handleSendMessage} className="p-4 bg-background/50 border-t">
          <div className="relative">
            <Input 
                placeholder="Type a message..." 
                className="pr-12 font-body" 
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
            />
            <Button type="submit" size="icon" className="absolute top-1/2 right-1 -translate-y-1/2 h-8 w-10">
              <SendHorizonal className="h-5 w-5" />
            </Button>
          </div>
        </form>
      </SheetContent>
    </Sheet>
  );
}
