import { MdClose } from "react-icons/md";
import { CartItemCard } from "./CartItemCard";
import styles from "./styles.module.scss";
import { useKeydown } from "../../hooks/useKeydown";

export const CartModal = ({
  cartList,
  removeProduct,
  removeAll,
  totalPrice,
  setModalOpen,
}) => {
  const buttonRef = useKeydown("Escape", (element) => {
    element.click();
  });

  return (
    <div className={styles.overlay}>
      <div role="dialog" className={styles.dialog}>
        <div className={styles.modal_title}>
          <h2>Carrinho de compras</h2>
          <button
            ref={buttonRef}
            onClick={() => setModalOpen(false)}
            aria-label="close"
            title="Fechar"
          >
            <MdClose size={21} />
          </button>
        </div>
        <div>
          <ul>
            {cartList.map((product) => (
              <CartItemCard
                key={product.id}
                product={product}
                removeProduct={removeProduct}
              />
            ))}
          </ul>
        </div>

        <div className={styles.checkout}>
          <div className={styles.checkout_border}>
            <span className={styles.total}>Total</span>
            <span>
              {totalPrice.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
            </span>
          </div>
        </div>
        <button className={styles.remove_all_button} onClick={removeAll}>
          Remover todos
        </button>
      </div>
    </div>
  );
};
