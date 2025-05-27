
import React, { useState } from 'react';
import { 
  Search, 
  Edit, 
  Send, 
  Paperclip, 
  MoreVertical, 
  User,
  Phone,
  Video,
  Info,
  Trash,
  Clock
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

// Mock data for conversations
const conversations = [
  {
    id: 1,
    name: "Dr. Jane Smith",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1000&auto=format&fit=crop",
    lastMessage: "When is the next assignment due?",
    time: "10:30 AM",
    unread: 3,
    online: true,
    role: "Instructor",
    messages: [
      { id: 1, text: "Hello, I have a question about the upcoming exam.", sender: "user", time: "10:20 AM" },
      { id: 2, text: "Sure, what would you like to know?", sender: "other", time: "10:25 AM" },
      { id: 3, text: "When is the next assignment due?", sender: "user", time: "10:30 AM" },
    ]
  },
  {
    id: 2,
    name: "Prof. Robert Johnson",
    avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1000&auto=format&fit=crop",
    lastMessage: "The calculus video tutorial is now available.",
    time: "Yesterday",
    unread: 0,
    online: false,
    role: "Instructor",
    messages: [
      { id: 1, text: "I've uploaded new materials for the next class.", sender: "other", time: "Yesterday, 3:45 PM" },
      { id: 2, text: "Thank you, I'll check them out.", sender: "user", time: "Yesterday, 4:30 PM" },
      { id: 3, text: "The calculus video tutorial is now available.", sender: "other", time: "Yesterday, 5:15 PM" },
    ]
  },
  {
    id: 3,
    name: "Maria Garcia",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1000&auto=format&fit=crop",
    lastMessage: "Can we form a study group for the biology exam?",
    time: "Tuesday",
    unread: 1,
    online: true,
    role: "Student",
    messages: [
      { id: 1, text: "Hi, are you preparing for the biology exam?", sender: "other", time: "Tuesday, 1:20 PM" },
      { id: 2, text: "Yes, I'm just starting to review the material.", sender: "user", time: "Tuesday, 2:05 PM" },
      { id: 3, text: "Can we form a study group for the biology exam?", sender: "other", time: "Tuesday, 2:30 PM" },
    ]
  },
  {
    id: 4,
    name: "James Wilson",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=1000&auto=format&fit=crop",
    lastMessage: "The history project deadline has been extended.",
    time: "Monday",
    unread: 0,
    online: false,
    role: "Student",
    messages: [
      { id: 1, text: "Have you started on the history project?", sender: "other", time: "Monday, 9:15 AM" },
      { id: 2, text: "I'm halfway through it. It's quite intensive.", sender: "user", time: "Monday, 10:30 AM" },
      { id: 3, text: "The history project deadline has been extended.", sender: "other", time: "Monday, 11:45 AM" },
    ]
  },
  {
    id: 5,
    name: "Course Announcements",
    avatar: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?q=80&w=1000&auto=format&fit=crop",
    lastMessage: "Important: Schedule change for next week's lectures.",
    time: "Apr 12",
    unread: 0,
    online: false,
    role: "System",
    messages: [
      { id: 1, text: "Welcome to the new semester! Check the syllabus for course details.", sender: "other", time: "Apr 10, 8:00 AM" },
      { id: 2, text: "Reminder: First assignment is due next Friday.", sender: "other", time: "Apr 11, 10:00 AM" },
      { id: 3, text: "Important: Schedule change for next week's lectures.", sender: "other", time: "Apr 12, 9:30 AM" },
    ]
  }
];

const Messages = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedConversation, setSelectedConversation] = useState(conversations[0]);
  const [messageText, setMessageText] = useState('');
  
  const filteredConversations = conversations.filter(
    conv => conv.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const handleSendMessage = () => {
    if (messageText.trim() === '') return;
    
    // In a real app, this would send the message to a backend
    console.log('Sending message:', messageText);
    
    // Clear the input
    setMessageText('');
  };
  
  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-6">Messages</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-200px)]">
        {/* Left sidebar - Conversation list */}
        <div className="lg:col-span-1 border rounded-lg overflow-hidden flex flex-col">
          <div className="p-4 border-b">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search messages..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          
          <div className="flex-1 overflow-y-auto">
            <Tabs defaultValue="all" className="w-full">
              <div className="px-4 pt-2">
                <TabsList className="grid grid-cols-3 w-full">
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="unread">Unread</TabsTrigger>
                  <TabsTrigger value="important">Important</TabsTrigger>
                </TabsList>
              </div>
              
              <TabsContent value="all" className="m-0">
                {filteredConversations.map(conversation => (
                  <div 
                    key={conversation.id}
                    className={`p-3 flex items-center border-b cursor-pointer hover:bg-gray-50 transition-colors ${selectedConversation.id === conversation.id ? 'bg-[#E5DEFF]' : ''}`}
                    onClick={() => setSelectedConversation(conversation)}
                  >
                    <div className="relative mr-3">
                      <Avatar className="h-12 w-12">
                        <img src={conversation.avatar} alt={conversation.name} className="object-cover" />
                      </Avatar>
                      {conversation.online && (
                        <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-white"></span>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start">
                        <h3 className="font-medium text-sm truncate">{conversation.name}</h3>
                        <span className="text-xs text-gray-500 whitespace-nowrap ml-2">{conversation.time}</span>
                      </div>
                      <p className="text-xs text-gray-500 truncate">{conversation.lastMessage}</p>
                    </div>
                    {conversation.unread > 0 && (
                      <Badge className="ml-2 bg-[#9b87f5]">{conversation.unread}</Badge>
                    )}
                  </div>
                ))}
              </TabsContent>
              
              <TabsContent value="unread" className="m-0">
                {filteredConversations.filter(c => c.unread > 0).map(conversation => (
                  <div 
                    key={conversation.id}
                    className={`p-3 flex items-center border-b cursor-pointer hover:bg-gray-50 transition-colors ${selectedConversation.id === conversation.id ? 'bg-[#E5DEFF]' : ''}`}
                    onClick={() => setSelectedConversation(conversation)}
                  >
                    <div className="relative mr-3">
                      <Avatar className="h-12 w-12">
                        <img src={conversation.avatar} alt={conversation.name} className="object-cover" />
                      </Avatar>
                      {conversation.online && (
                        <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-white"></span>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start">
                        <h3 className="font-medium text-sm truncate">{conversation.name}</h3>
                        <span className="text-xs text-gray-500 whitespace-nowrap ml-2">{conversation.time}</span>
                      </div>
                      <p className="text-xs text-gray-500 truncate">{conversation.lastMessage}</p>
                    </div>
                    <Badge className="ml-2 bg-[#9b87f5]">{conversation.unread}</Badge>
                  </div>
                ))}
                
                {filteredConversations.filter(c => c.unread > 0).length === 0 && (
                  <div className="p-6 text-center text-gray-500">
                    <p>No unread messages</p>
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="important" className="m-0">
                <div className="p-6 text-center text-gray-500">
                  <p>No important messages marked</p>
                </div>
              </TabsContent>
            </Tabs>
          </div>
          
          <div className="p-4 border-t mt-auto">
            <Button className="w-full bg-[#9b87f5] hover:bg-[#7E69AB]" onClick={() => {}}>
              <Edit className="mr-2 h-4 w-4" /> New Message
            </Button>
          </div>
        </div>
        
        {/* Right side - Message content */}
        <div className="lg:col-span-2 border rounded-lg overflow-hidden flex flex-col">
          {selectedConversation ? (
            <>
              {/* Conversation header */}
              <div className="p-4 border-b flex justify-between items-center">
                <div className="flex items-center">
                  <Avatar className="h-10 w-10 mr-3">
                    <img src={selectedConversation.avatar} alt={selectedConversation.name} className="object-cover" />
                  </Avatar>
                  <div>
                    <h3 className="font-medium">{selectedConversation.name}</h3>
                    <p className="text-xs text-gray-500 flex items-center">
                      <Badge variant="outline" className="mr-2 text-xs">
                        {selectedConversation.role}
                      </Badge>
                      {selectedConversation.online ? (
                        <span className="text-green-500 flex items-center">
                          <span className="h-2 w-2 rounded-full bg-green-500 mr-1"></span> Online
                        </span>
                      ) : (
                        <span className="text-gray-500">Offline</span>
                      )}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Button variant="ghost" size="icon">
                    <Phone className="h-5 w-5" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Video className="h-5 w-5" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Info className="h-5 w-5" />
                  </Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreVertical className="h-5 w-5" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Conversation</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>
                        <User className="mr-2 h-4 w-4" /> View Profile
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Clock className="mr-2 h-4 w-4" /> Mute Notifications
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-red-600">
                        <Trash className="mr-2 h-4 w-4" /> Delete Conversation
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
              
              {/* Messages area */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
                {selectedConversation.messages.map(message => (
                  <div 
                    key={message.id} 
                    className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    {message.sender !== 'user' && (
                      <Avatar className="h-8 w-8 mr-2">
                        <img src={selectedConversation.avatar} alt={selectedConversation.name} className="object-cover" />
                      </Avatar>
                    )}
                    <div 
                      className={`max-w-[70%] px-4 py-2 rounded-lg ${
                        message.sender === 'user' 
                          ? 'bg-[#9b87f5] text-white' 
                          : 'bg-white border'
                      }`}
                    >
                      <p className="text-sm">{message.text}</p>
                      <span className={`text-xs block mt-1 ${message.sender === 'user' ? 'text-white/70' : 'text-gray-500'}`}>
                        {message.time}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Message input area */}
              <div className="p-4 border-t bg-white">
                <div className="flex">
                  <Input
                    placeholder="Type your message..."
                    className="flex-1 mr-2"
                    value={messageText}
                    onChange={(e) => setMessageText(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  />
                  <Button variant="ghost" size="icon" className="mr-1">
                    <Paperclip className="h-5 w-5" />
                  </Button>
                  <Button onClick={handleSendMessage} className="bg-[#9b87f5] hover:bg-[#7E69AB]">
                    <Send className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center p-6 text-center text-gray-500">
              <div>
                <User className="h-16 w-16 mx-auto text-gray-300 mb-4" />
                <h3 className="text-lg font-medium text-gray-700 mb-1">No conversation selected</h3>
                <p>Choose a conversation from the list or start a new one.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Messages;
