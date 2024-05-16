import { MdDelete } from "react-icons/md";
import styles from "./styles.module.scss";

export const CartItemCard = ({ product, removeProduct }) => {
  return (
    <li className={styles.cart_item}>
      <div className={styles.left_side}>
        <img src={product.img} alt={product.name} />
        <div className={styles.middle_row}>
          <h3>{product.name}</h3>
          <span>
            {product.price.toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            })}
          </span>
        </div>
      </div>

      <button onClick={() => removeProduct(product)} aria-label="delete" title="Remover item">
        <MdDelete size={21} />
      </button>
    </li>
  );
};
