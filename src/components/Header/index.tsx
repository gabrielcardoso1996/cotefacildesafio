import { HeaderContainer, HeaderLogo } from "./styles";
import igniteLogo from "../../assets/logo.svg";

interface IHeaderProps {
  logo?: string;
  alt?: string;
}

export function Header({ 
  logo = igniteLogo,
  alt = "Logotipo do Ignite"
}: IHeaderProps) {
  return (
    <HeaderContainer>
      <HeaderLogo src={logo} alt={alt} />
    </HeaderContainer>
  );
}
