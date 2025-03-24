import Image from "next/image";
interface NavButtonProps {
    src: string;
    alt: string;
    width: number;
    height: number;
    text: string;
}
export default function NavButton({ src, alt, width, height, text }: NavButtonProps) {
    return (
        <div className="flex flex-col items-center justify-center">
            <Image src={src} alt={alt} width={width} height={height} />
            <div>{text}</div>
        </div>
    );
}