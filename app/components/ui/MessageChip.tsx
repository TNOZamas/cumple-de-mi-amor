// Componente Chip para resaltar mensajes
export const MessageChip = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="font-chip text-xl inline-flex items-center gap-2 rounded-full border border-pink-400/30 bg-pink-500/10 px-4 py-1.5 font-medium text-pink-200 backdrop-blur-md shadow-[0_0_15px_rgba(244,114,182,0.15)]">
      <span className="h-2 w-2 rounded-full bg-pink-400 animate-pulse shadow-[0_0_8px_#f472b6]" />
      {children}
    </div>
  );
};
