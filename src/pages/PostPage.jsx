import React, { useEffect, useRef, useState } from "react";
import MainLayout from "../Layouts/MainLayout";
import axios from "axios";
import { toast } from "react-toastify";
import "../styles/Item.css";
import { ComponentToPrint } from "../components/ToPrint";
import { useReactToPrint } from "react-to-print";

const PostPage = () => {
	const API_URL = import.meta.env.VITE_API_URL;

	//state
	const [products, setProducts] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [cart, setcart] = useState([]);
	const [totalAmount, setTotalAmount] = useState(0);

	const toastOption = {
		autoClose: 900,
		pauseOnHover: true,
	};

	//fetchFunctions
	const fetchProduct = async () => {
		setIsLoading(false);
		try {
			const { data } = await axios.get(API_URL);
			return data;
		} catch (error) {
			console.log(error);
		}
		setIsLoading(true);
	};

	useEffect(() => {
		const getPost = async () => {
			const postData = await fetchProduct();
			setProducts(postData);
		};
		getPost();
	}, []);

	//AddProduct
	const addProductToCart = async (product) => {
		//check if adding product exist
		let findProductInCart = await cart.find((i) => {
			return i.id === product.id;
		});
		if (findProductInCart) {
			let newCart = [];
			let newItem;

			cart.forEach((cartItem) => {
				if (cartItem.id === product.id) {
					newItem = {
						...cartItem,
						quantity: cartItem.quantity + 1,
						totalAmount: cartItem.totalAmount * Number(cartItem.quantity + 1),
					};
					newCart.push(newItem);
				} else {
					newCart.push(cartItem);
				}
			});

			setcart(newCart);
			toast(`Added ${newItem.name} to cart. `, toastOption);
		} else {
			let addingProduct = {
				...product,
				quantity: 1,
				totalAmount: product.price,
			};
			setcart([...cart, addingProduct]);
			toast(`Added ${product.name} to cart.`, toastOption);
		}
	};
	useEffect(() => {
		let newTotalAmount = 0;
		cart.forEach((ItemCart) => {
			newTotalAmount = newTotalAmount + Number(ItemCart.totalAmount);
		});

		setTotalAmount(newTotalAmount);
	}, [cart]);

	//removeProduct
	const removeProduct = (cartProduct) => {
		const removedProduct = cart.filter((t) => t.id !== cartProduct.id);
		setcart(removedProduct);
	};

	//Print a receipt

	const handlePrint = () => {
		handleReactToPrint();
	};

	const componentRef = useRef();

	const handleReactToPrint = useReactToPrint({
		content: () => componentRef.current,
	});

	return (
		<>
			<MainLayout>
				<div className="row">
					<div className="col-lg-8">
						{isLoading ? (
							"Loading..."
						) : (
							<div className="row">
								{products.map((product, index) => (
									<div className="col-lg-4 ms-5" key={index}>
										<div
											className=" pos-item  px-3 text-center border border-primary"
											onClick={() => addProductToCart(product)}>
											<p>{product.name}</p>
											<img
												src={product.img}
												className="img-fluid"
												alt={product.name}
											/>
											<p>${product.price}</p>
										</div>
									</div>
								))}
							</div>
						)}
					</div>

					<div className=" col 12 col-lg-4 ">
						<div className="" style={{ display: "none" }}>
							<ComponentToPrint
								cart={cart}
								totalAmount={totalAmount}
								ref={componentRef}
							/>
						</div>
						<div className="table-responsive bg-dark ">
							<table className="table table-responsive table-dark table-hover">
								<thead>
									<tr>
										<td>Id</td>
										<td>Name</td>
										<td>Price</td>
										<td>Qty</td>
										<td>Total</td>
										<td>Action</td>
									</tr>
								</thead>
								<tbody>
									{cart
										? cart.map((cartProduct, index) => (
												<tr key={index}>
													<td>{cartProduct.id}</td>
													<td>{cartProduct.name}</td>
													<td>{cartProduct.price}</td>
													<td>{cartProduct.quantity}</td>
													<td>{cartProduct.totalAmount}</td>
													<td>
														<button
															className="btn btn-danger btn-sm"
															onClick={() => removeProduct(cartProduct)}>
															remove
														</button>
													</td>
												</tr>
										  ))
										: "No item in your cart, Add now !"}
								</tbody>
							</table>
							<h2 className="px-2 text-white">
								{cart.length
									? `Total Amount : $${totalAmount}`
									: "No item in cart !"}
							</h2>
						</div>
						<div className="mt-2">
							{totalAmount !== 0 ? (
								<div>
									<button className="btn btn-primary" onClick={handlePrint}>
										Pay Now !{" "}
									</button>
								</div>
							) : (
								"Please add a product to cart"
							)}
						</div>
					</div>
				</div>
			</MainLayout>
		</>
	);
};

export default PostPage;
