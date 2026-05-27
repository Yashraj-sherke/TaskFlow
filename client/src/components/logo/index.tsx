import { Blend } from "lucide-react";

const Logo = ({ className = "" }: { className?: string }) => {
  return (
    <div className={`flex items-center justify-center sm:justify-start ${className}`}>
      <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
        <Blend className="size-4" />
      </div>
    </div>
  );
};

export default Logo;
