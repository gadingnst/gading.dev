'use client';

import { useEffect, useRef, useState } from 'react';

import cn from '@/designs/utils/cn';
import usePrefersReducedMotion from '@/packages/hooks/usePrefersReducedMotion';
import { I18nLocales } from '@/packages/libs/I18n/interface';

import type { ProjectChat } from '../Portfolio.data';

interface Props {
  chats: ProjectChat[];
  lang: I18nLocales;
  className?: string;
}

interface Message {
  id: number;
  from: 'user' | 'agent';
  text: string;
  meta: string;
}

/** wait before each phase of a scenario: user writes, agent starts typing, agent replies */
const PHASE_DELAYS = [2600, 700, 1500];
/** older bubbles leave through the top fade; this many are kept in the DOM */
const MAX_MESSAGES = 6;

function scenarioMessages(chat: ProjectChat, lang: I18nLocales, firstId: number): Message[] {
  return [
    { id: firstId, from: 'user', text: chat.user[lang], meta: chat.time },
    { id: firstId + 1, from: 'agent', text: chat.agent[lang], meta: `${chat.agentName} · ${chat.time}` }
  ];
}

/**
 * The chat mock of the big Nouride card, played as a loop: a message, "typing…",
 * the reply, a pause, the next scenario. Plays only while the card is on screen
 * and the tab is visible; with reduced motion it stays on the first exchange.
 */
function ChatLoop({ chats, lang, className }: Props) {
  const reducedMotion = usePrefersReducedMotion();
  const rootRef = useRef<HTMLDivElement>(null);

  // the first exchange is what the server renders, so the loop starts with the second
  const [messages, setMessages] = useState<Message[]>(() => scenarioMessages(chats[0], lang, 0));
  const [typing, setTyping] = useState(false);
  const [step, setStep] = useState(3);
  const [inView, setInView] = useState(false);
  const [tabVisible, setTabVisible] = useState(true);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.35 });
    observer.observe(root);
    const onVisibility = () => setTabVisible(document.visibilityState === 'visible');
    document.addEventListener('visibilitychange', onVisibility);
    return () => {
      observer.disconnect();
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, []);

  const playing = inView && tabVisible && !reducedMotion && chats.length > 1;

  useEffect(() => {
    if (!playing) return;
    const phase = step % 3;
    const chat = chats[Math.floor(step / 3) % chats.length];
    const timer = window.setTimeout(() => {
      if (phase === 0) {
        setMessages((prev) => [...prev, { id: step * 2, from: 'user' as const, text: chat.user[lang], meta: chat.time }].slice(-MAX_MESSAGES));
      } else if (phase === 1) {
        setTyping(true);
      } else {
        setTyping(false);
        setMessages((prev) => [
          ...prev,
          { id: step * 2, from: 'agent' as const, text: chat.agent[lang], meta: `${chat.agentName} · ${chat.time}` }
        ].slice(-MAX_MESSAGES));
      }
      setStep(step + 1);
    }, PHASE_DELAYS[phase]);
    return () => window.clearTimeout(timer);
  }, [playing, step, chats, lang]);

  // reduced motion (or a single scenario): the first exchange, nothing moving
  const shown = playing || messages.length > 2 ? messages : scenarioMessages(chats[0], lang, 0);

  return (
    <div
      ref={rootRef}
      className={cn('chat-loop relative h-[236px] overflow-hidden rounded-[18px] bg-base-100 text-sm lg:h-auto lg:min-h-[236px] lg:flex-1', className)}
    >
      <p className="sr-only">
        {chats.map((chat) => `${chat.user[lang]} → ${chat.agentName}: ${chat.agent[lang]}`).join(' · ')}
      </p>
      <div aria-hidden className="chat-loop-mask absolute inset-0 flex flex-col justify-end gap-2.5 p-4">
        {shown.map((message) => (
          <div
            key={message.id}
            className={cn(
              'chat-bubble max-w-[82%] shrink-0 px-3.5 py-[9px]',
              message.from === 'user'
                ? 'self-end rounded-2xl rounded-br-[4px] bg-base-content text-base-100'
                : 'self-start rounded-2xl rounded-bl-[4px] bg-card shadow-soft'
            )}
          >
            {message.text}
            <small className="mt-0.5 block font-mono text-[11px] opacity-60">{message.meta}</small>
          </div>
        ))}
        {typing && (
          <div className="chat-bubble flex shrink-0 items-center gap-2 self-start rounded-2xl rounded-bl-[4px] bg-card px-3.5 py-[11px] shadow-soft">
            <span className="font-mono text-[11px] text-muted">{chats[0].agentName}</span>
            <span className="chat-typing flex gap-1">
              <span />
              <span />
              <span />
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

export default ChatLoop;
