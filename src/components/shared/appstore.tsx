interface AppStoreCardProps {
  platform: string;
  icon: React.ReactNode;
  link: string;
}

export const AppStoreCard = ({ platform, icon, link }: AppStoreCardProps) => {
  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="bg-white text-black border rounded-md px-3 py-2 flex items-center gap-x-3 hover:shadow-lg transition-shadow"
      aria-label={`Download on the ${platform}`}
    >
      {icon}
      <div className="flex flex-col">
        <p className="text-[10px] sm:text-xs">Download on the</p>
        <h1 className="text-sm sm:text-base font-medium">{platform}</h1>
      </div>
    </a>
  );
};
