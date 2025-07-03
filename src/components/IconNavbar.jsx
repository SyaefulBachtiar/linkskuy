
export default function IconNavbar({ menuActive, clicIconkMenu }) {
  return (
    <div
      onClick={clicIconkMenu}
      className={`icon-menu ${
        menuActive ? "active" : "none-active"
      } m-5 mr-14 flex sm:flex md:hidden lg:hidden xl:hidden h-[20px] absolute top-2 right-0`}
    >
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
}