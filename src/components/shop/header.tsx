import Link from "next/link";

export const Header = () => {
  return (
    <header className=" p-2 border-b border-[rgba(0,0,0,0.1)">
      <div className="flex-shrink-0 ">
        <Link href={"/"}>
          <img
            src="/logo.png"
            alt="Vinkol Logo"
            className="w-28 h-12 object-contain"
          />
        </Link>
      </div>
    </header>
  );
};
