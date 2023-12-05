export default function Header() {
    return (
<header className="flex flex-col items-center  mb-16">
    <title>Devvi Cake</title>
    <img src="logo.png" className="object-contain mb-8 w-44 h-44"></img>
    <h1 className="text-4xl font-semibold tracking-widest text-center uppercase text-amber-800">DevviCake</h1>
    <p className="text-stone-500 mt-1 text-center"> Indulge in Sweet Delights: Where Every Bite is a Celebration!</p>
</header>
    );
}