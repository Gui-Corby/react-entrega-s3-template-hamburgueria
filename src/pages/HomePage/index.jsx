import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CartModal } from "../../components/CartModal";
import { Header } from "../../components/Header";
import { ProductList } from "../../components/ProductList";
import { api } from "../../services/api";
import styles from "./styles.module.scss";

export const HomePage = () => {
  const localCartList = localStorage.getItem("CartList");

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");

  const [loading, setLoading] = useState(false);
  const [productList, setProductList] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [cartList, setCartList] = useState(
    localCartList ? JSON.parse(localCartList) : []
  );
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const getProducts = async () => {
      try {
        setLoading(true);
        const { data } = await api.get("products");
        setProductList(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    getProducts();
  }, []);

  const productsSearchResults = productList.filter((product) => {
    const searchFilter =
      search === ""
        ? true
        : product.name.toLowerCase().includes(search.toLowerCase()) ||
          product.category.toLowerCase().includes(search.toLowerCase());

    const categoryFilter =
      category === "" ? true : product.category === category;

    return searchFilter && categoryFilter;
  });

  const cleanFilters = () => {
    setSearch("");
    setCategory("");
  };

  useEffect(() => {
    const newTotalPrice = cartList.reduce(
      (total, product) => total + product.price,
      0
    );
    setTotalPrice(newTotalPrice);
  }, [cartList]);

  useEffect(() => {
    localStorage.setItem("CartList", JSON.stringify(cartList));
  }, [cartList]);

  const addProduct = (product) => {
    const existingProduct = cartList.find((item) => item.id === product.id);
    if (existingProduct) {
      toast.warning("Este produto já foi adicionado no carrinho");
    } else {
      setCartList([...cartList, product]);
    }
  };

  const removeProduct = (product) => {
    const newCartList = cartList.filter((item) => item.id !== product.id);
    setCartList(newCartList);
  };

  const removeAll = () => {
    setCartList([]);
  };

  return (
    <>
      <Header
        setModalOpen={setModalOpen}
        cartList={cartList}
        setSearch={setSearch}
        setCategory={setCategory}
        cleanFilters={cleanFilters}
      />
      <main>
        <ProductList
          productList={productList}
          addProduct={addProduct}
          productsSearchResults={productsSearchResults}
        />
        {isModalOpen ? (
          <CartModal
            setModalOpen={setModalOpen}
            cartList={cartList}
            removeProduct={removeProduct}
            removeAll={removeAll}
            totalPrice={totalPrice}
          />
        ) : null}
        <ToastContainer />
      </main>
    </>
  );
};
