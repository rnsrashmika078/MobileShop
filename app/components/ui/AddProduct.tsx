"use client";
import { useState } from "react";
import Input from "./Input";
import Button from "./Button";
import { Select, SelectItem } from "./Select";
import ImageUpload from "./ImageUpload";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { ImgProperty } from "@/types";
import { setSimpleNotification } from "@/redux/NotifySlicer";
import { AddNewProduct } from "@/app/action/AddNewProduct";
import { image } from "framer-motion/client";

const AddProduct = () => {
  const router = useRouter();
  const editProduct = useSelector(
    (store: RootState) => store.product.editProduct
  );

  const [form, setForm] = useState({
    name: "",
    model: "",
    color: "",
    price: "",
    category: "",
    stock: "",
  });

  const [imageProperty, setImageProperty] = useState<ImgProperty[]>([]);
  const dispatch = useDispatch<AppDispatch>();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSelect = (value: string, key: string) => {
    setForm({ ...form, [key]: value });
  };

  const handleCancel = () => {
    router.push("/home");
  };

  const handleSubmit = async (id: string | null, type: string) => {
    const newProduct = {
      ...form,
      model: form.model,
      name: form.name,
      color: form.color,
      category: form.category || "Backcovers",
      stock: parseInt(form.stock),
      images: imageProperty.filter((img) => img.secure_url !== ""),
    };

    const formData: FormData = new FormData();
    formData.append("name", newProduct.name);
    formData.append("model", newProduct.model);
    formData.append("color", newProduct.color);
    formData.append("price", newProduct.price.toString());
    formData.append("category", newProduct.category);
    formData.append("stock", newProduct.stock.toString());
    formData.append("images", JSON.stringify(newProduct.images));

    if (type === "Add Product") {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/addproduct`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
            credentials: "include", // ✅ important
          }
        );
        const data = await res.json();
        if (data.success) {
          setForm({
            name: "",
            model: "",
            price: "",
            color: "",
            category: "",
            stock: "",
          });
          setImageProperty([
            { secure_url: "", public_id: "" },
            { secure_url: "", public_id: "" },
          ]);
          window.scrollTo({ behavior: "smooth", top: 0 });
          // router.push("/addproduct");
          dispatch(
            setSimpleNotification({
              simpleMessage: res.message,
            })
          );
          await new Promise((resolve) => setTimeout(resolve, 2000));
          window.location.reload();
        }
      } catch (error: unknown) {
        if (error instanceof Error) {
        }
      }
    } else {
      // try {
      //     const res = await axios.put(
      //         `http://localhost:5000/api/auth/updatePost/${id}`,
      //         newProduct
      //     );
      //     if (res.success) {
      //         dispatch(
      //             setSimpleNotification({
      //                 simpleMessage: res.data.message,
      //             })
      //         );
      //         setForm({
      //             name: "",
      //             model: "",
      //             color: "",
      //             price: "",
      //             category: "",
      //             stock: "",
      //         });
      //         setImageProperty([
      //             { secure_url: "", public_id: "" },
      //             { secure_url: "", public_id: "" },
      //         ]);
      //         window.scrollTo({ behavior: "smooth", top: 0 });
      //         router.push("/addproduct");
      //     }
      // } catch (error) {
      //     alert(`error ${error}`);
      // }
    }
  };

  // useEffect(() => {
  //     if (editProduct) {
  //         const fixedImages = [...Array(2)].map(
  //             (_, i) => editProduct.images[i]
  //         );
  //         setImageProperty(fixedImages);
  //         setForm({
  //             name: editProduct.name || "",
  //             price: editProduct.price.toString() || "",
  //             color: editProduct.color || "",
  //             category: editProduct.category || "",
  //             stock: editProduct.stock.toString() || "",
  //             model: editProduct.model || "",
  //         });
  //     }
  // }, [editProduct]);

  console.log(imageProperty);

  return (
    <div className="mt-5 w-full max-w-md mx-auto p-6 bg-white rounded-lg shadow-md space-y-4 border border-gray-200">
      <h2 className="text-2xl font-semibold">
        {editProduct ? "Edit Product" : "Add New Product"}
      </h2>

      <Input
        label="Product Name"
        name="name"
        value={form.name}
        onChange={handleChange}
        placeholder="e.g. iPhone 13 Backcover"
      />

      <Input
        label="Model"
        name="model"
        value={form.model}
        onChange={handleChange}
        placeholder="e.g. iPhone 13"
      />
      <Input
        label="Primary Color"
        name="color"
        value={form.color}
        onChange={handleChange}
        placeholder="e.g. Black"
      />

      <Input
        label="Price (LKR)"
        name="price"
        type="number"
        value={form.price}
        onChange={handleChange}
        placeholder="e.g. 1200"
      />

      <Select
        value={form.category}
        onValueChange={(v) => handleSelect(v, "category")}
      >
        <SelectItem value="">Select Category</SelectItem>
        <SelectItem value="Backcovers">Backcovers</SelectItem>
        <SelectItem value="Tempered Glass">Tempered Glass</SelectItem>
        <SelectItem value="Chargers">Chargers</SelectItem>
        <SelectItem value="Headset">Headset</SelectItem>
        <SelectItem value="Earphone">Earphone</SelectItem>
        <SelectItem value="Headphone">Headphone</SelectItem>
        <SelectItem value="Earbuds">Earbuds</SelectItem>
        <SelectItem value="Speaker">Speaker</SelectItem>
        <SelectItem value="Smart Watch">Smart Watch</SelectItem>
      </Select>

      <Input
        label="Stock Quantity"
        name="stock"
        type="number"
        value={form.stock}
        onChange={handleChange}
        placeholder="e.g. 20"
      />

      <label className="block text-sm font-medium text-gray-700 mb-1">
        Upload Images
      </label>
      {[...Array(2)].map((_, i) => (
        <ImageUpload
          key={i}
          index={i}
          placeholder="Drag and Drop images"
          setImageProperty={setImageProperty}
          ImageProperty={imageProperty}
          type={editProduct?._id ? "editing" : "adding"}
        />
      ))}

      <Button
        onClick={() =>
          handleSubmit(
            editProduct?._id ? editProduct?._id : null,
            editProduct?._id ? "Update Product" : "Add Product"
          )
        }
        className="w-full"
      >
        {editProduct ? "Update Product" : "Add Product"}
      </Button>
      <Button onClick={handleCancel} className="w-full" variant="negative">
        Cancel
      </Button>
    </div>
  );
};

export default AddProduct;
