import "./styles.css";

interface IProps {
  headerPreto: boolean;
}

export const Header: React.FC<IProps> = ({ headerPreto }) => {
  return (
    <header className={`${headerPreto ? "header-preto" : ""}`}>
      <div className="header-logo">
        <a href="/">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/Logonetflix.png/1200px-Logonetflix.png"
            alt="netflix"
          />
        </a>
      </div>
      <div className="header-usuario">
        <a href="/minha-conta">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"
            alt="usuário"
          />
        </a>
      </div>
    </header>
  );
};
