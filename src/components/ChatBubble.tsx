import { cn } from "@/lib/utils";
//@ts-ignore
export default function ChatBubble({ message }) {
  return (
    <div
      className={cn(
        "max-w-md p-4 rounded-lg",
        message.isUser
          ? "bg-blue-600 text-white ml-auto"
          : "bg-gray-700 text-white"
      )}
    >
      {message.text}
    </div>
  );
}

