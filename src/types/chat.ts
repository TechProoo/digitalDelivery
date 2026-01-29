export interface ChatMessage {
  message: string;
  userId?: string;
  conversationId?: string;
}

export interface ChatResponse {
  message: string;
  intent?: string;
  timestamp: string;
}
