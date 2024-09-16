import Link from "next/link";

const NavBar = () => {
  return (
    <section className="sticky z-50 top-0 flex flex-row items-center justify-around  text-white bg-[#5956e9] h-20">
      <div className="flex items-center">
        <div className="bg-white text-white rounded-full p-2">
          <span className="text-xl font-bold text-black">e</span>
        </div>
        <span className="ml-2 text-2xl font-bold text-white ">
          <Link href="/">Redex</Link>
        </span>
      </div>

      <div className="flex gap-6">
        <Link href="/" className="text-xl">
          List of users
        </Link>
        <Link href="/createUser" className="text-xl">
          Create
        </Link>
      </div>
    </section>
  );
};

export default NavBar;
