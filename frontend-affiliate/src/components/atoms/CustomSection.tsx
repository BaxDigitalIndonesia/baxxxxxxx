import { cn } from "@/lib/utils";

const CustomSection = ({ children, className }: SectionProps) => {
  return (
    <div
      className={cn(
        "w-full relative flex items-center justify-center flex-col px-4 md:px-0 py-8",
        className
      )}>
      {children}
    </div>
  );
};

export default CustomSection;
