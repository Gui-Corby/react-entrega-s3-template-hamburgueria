import { useState } from "react";
import Logo from "../../assets/Logo.svg";
import { MdSearch, MdShoppingCart } from "react-icons/md";
import styles from "./styles.module.scss";

export const Header = ({ setModalOpen, cartList, setSearch }) => {
  const [value, setValue] = useState("");
 

  const submit = (e) => {
    e.preventDefault();
    setSearch(value);
    setValue("");
  }

  return (
    <header>
      <div className="container">
        <div className={styles.header__flex_box}>
          <img src={Logo} alt="Logo Kenzie Burguer" />
          <div className={styles.flex_box_right}>
            <button
              className={styles.cart_button}
              onClick={() => setModalOpen(true)}
            >
              <MdShoppingCart size={21} />
              <span>{cartList.length}</span>
            </button>
            <form onSubmit={submit}>
              <input
                placeholder="Pesquisar..."
                type="text"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                required
              />
              <button className={styles.glass} type="submit">
                <MdSearch size={21} />
              </button>
            </form>
          </div>
        </div>
      </div>
    </header>
  );
};
