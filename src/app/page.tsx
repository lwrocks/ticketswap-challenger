import { Book, ListTodo } from "lucide-react";
import { Logo } from "./components/Logo";
import { PopularEvents } from "./components/PopularEvents";
import { SearchEvents } from "./components/SearchEvents";

export default function Home() {
  return (
    <main className="max-w-3xl mx-auto p-4 my-4 grid gap-5">
      <div className="grid gap-3">
        <Logo />
      </div>

      <PopularEvents />
      <SearchEvents />
    </main>
  );
}
