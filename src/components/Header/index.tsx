import { HeaderContainer, HeaderLogo, NavigationContainer, NavItem } from "./styles";
import todoIcon from "../../assets/todo-icon.svg";
import galleryIcon from "../../assets/gallery-icon.svg";
import dashboardIcon from "../../assets/dashboard-icon.svg";
import { useLocation, useNavigate } from "react-router-dom";

export function Header() {
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { path: "/", icon: todoIcon, label: "Tarefas", title: "Lista de Tarefas" },
    { path: "/gallery", icon: galleryIcon, label: "Galeria", title: "Galeria de Imagens" },
    { path: "/dashboard", icon: dashboardIcon, label: "Dashboard", title: "Dashboard de Tarefas" },
  ];

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  return (
    <HeaderContainer>
      <NavigationContainer>
        {navItems.map((item) => (
          <NavItem
            key={item.path}
            onClick={() => handleNavigation(item.path)}
            className={location.pathname === item.path ? 'active' : ''}
            title={item.title}
          >
            <img src={item.icon} alt={item.label} />
            <span>{item.label}</span>
          </NavItem>
        ))}
      </NavigationContainer>
    </HeaderContainer>
  );
}
