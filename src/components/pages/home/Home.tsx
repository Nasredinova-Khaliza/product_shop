/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
	useDeleteProductMutation,
	useGetProductsQuery,
	usePostProductMutation,
} from "../../../redux/api/product/productApi";
import scss from "./Home.module.scss";
import Modal from "../../modal/Modal";
import { Link } from "react-router-dom";

interface FormValues {
	productName: string;
	quantity: number;
	price: number;
	photoUrl: string;
}

interface ProductsFormModal {
	handleClose: () => void;
}
const Home: React.FC<ProductsFormModal> = () => {
	const [modalIsOpen, setModalIsOpen] = useState(false);

	const [postProduct] = usePostProductMutation();
	const { data: products = [] } = useGetProductsQuery();
	const [deleteProduct] = useDeleteProductMutation();
	const formik = useFormik<FormValues>({
		initialValues: {
			productName: "",
			quantity: 0,
			price: 0,
			photoUrl: "",
		},
		validationSchema: Yup.object({
			productName: Yup.string().required("Обязательное поле"),
			quantity: Yup.number()
				.required("Обязательное поле")
				.positive("Должно быть положительным числом"),
			price: Yup.number()
				.required("Обязательное поле")
				.positive("Должно быть положительным числом"),
			photoUrl: Yup.string().required("Обязательное поле"),
		}),
		onSubmit: async (values: any, { resetForm }) => {
			const newProduct = {
				productName: values.productName,
				quantity: values.quantity,
				price: values.price,
				photoUrl: values.photoUrl,
			};

			await postProduct(newProduct);
			resetForm();
			setModalIsOpen(false);
		},
	});

	const deleteProductId = async (_id: string) => {
		await deleteProduct(_id);
	};

	return (
		<div className={scss.HomePage}>
			<div className="container">
				<button
					onClick={() => setModalIsOpen(true)}
					className={scss.openButton}>
					Добавить Продукт
				</button>
				<div className={scss.content}>
					<Modal isOpen={modalIsOpen} onClose={() => setModalIsOpen(false)}>
						<form onSubmit={formik.handleSubmit} className={scss.ModalContent}>
							<input
								type="text"
								id="productName"
								name="productName"
								placeholder="Введите название продукта"
								width="300px"
								value={formik.values.productName}
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
							/>
							{formik.touched.productName && formik.errors.productName && (
								<div style={{ color: "red" }}>{formik.errors.productName}</div>
							)}
							<input
								type="number"
								id="quantity"
								name="quantity"
								placeholder="Введите количество"
								width="300px"
								value={formik.values.quantity}
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
							/>
							{formik.touched.quantity && formik.errors.quantity && (
								<div style={{ color: "red" }}>{formik.errors.quantity}</div>
							)}
							<input
								type="number"
								id="price"
								name="price"
								placeholder="Введите цену"
								width="300px"
								value={formik.values.price}
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
							/>
							{formik.touched.price && formik.errors.price && (
								<div style={{ color: "red" }}>{formik.errors.price}</div>
							)}
							<input
								type="text"
								id="photoUrl"
								name="photoUrl"
								placeholder="Введите URL изображения продукта"
								width="300px"
								value={formik.values.photoUrl}
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
							/>
							{formik.touched.photoUrl && formik.errors.photoUrl && (
								<div style={{ color: "red" }}>{formik.errors.photoUrl}</div>
							)}
							<button type="submit">Добавить</button>
						</form>
					</Modal>
					{products.map((item) => {
						return (
							<div className={scss.Cards}>
								<Link key={item._id} to={`/product/${item._id}`}>
									<img src={item.photoUrl} alt="img" />
									<h3>{item.productName}</h3>
									<p>Количество: {item.quantity}</p>
									<p>Цена: {item.price}</p>
								</Link>
								<div className={scss.buttons}>
									<button>Добавить в корзину</button>
									<button
										className={scss.deleteBtn}
										onClick={() => deleteProductId(item._id)}>
										delete
									</button>
								</div>
							</div>
						);
					})}
				</div>
			</div>
		</div>
	);
};
export default Home;
