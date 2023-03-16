import { useState, useEffect } from "react";
import { SideNavContainer, SideNav, ListItem, ListItemTitle } from "./styles";

interface NavItem {
  label: string;
  id: string;
}

function NavScroll() {
  const [activeIndex, setActiveIndex] = useState(0);

  const navItems: NavItem[] = [
    { id: "home", label: "Home" },
    { id: "projects", label: "Projects" },
    { id: "contact", label: "Contact" },
  ];

  // changes the pages on click based on the name
  const removeActiveClass = () => {
    const section1 = document.getElementById("section-1");
    const section2 = document.getElementById("section-2");
    const section3 = document.getElementById("section-3");
  
    section1?.classList.remove("is-active");
    section2?.classList.remove("is-active");
    section3?.classList.remove("is-active");
  };
  
  const addActiveClass = (index: number) => {
    const section = document.getElementById(`section-${index + 1}`);
    section?.classList.add("is-active");
  };
  
  const handleItemClick = (index: number) => {
    setActiveIndex(index);
  
    removeActiveClass();
  
    switch (navItems[index].id) {
      case "home":
        addActiveClass(0);
        break;
      case "projects":
        addActiveClass(1);
        break;
      case "contact":
        addActiveClass(2);
        break;
      default:
        break;
    }
  };    

  useEffect(() => {
    const handleWindowWheel = (event: WheelEvent) => {
      if (event.deltaY > 0) {
        setActiveIndex(Math.min(activeIndex + 1, navItems.length - 1));
      } else if (event.deltaY < 0) {
        setActiveIndex(Math.max(activeIndex - 1, 0));
      }
    };
  
    window.addEventListener('wheel', handleWindowWheel);
  
    return () => {
      window.removeEventListener('wheel', handleWindowWheel);
    };
  }, [activeIndex, navItems.length]);
  

  return (
    <SideNavContainer>
      <SideNav>
        {navItems.map(({ id, label }, index) => (
          <ListItem
            key={id}
            className={activeIndex === index ? "is-active" : ""}
            onClick={() => handleItemClick(index)}
          >
            <ListItemTitle>{label}</ListItemTitle>
          </ListItem>
        ))}
      </SideNav>
    </SideNavContainer>
  );
}

export default NavScroll;
