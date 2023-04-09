import { Footer } from "../../components/footer/footer";
import { Header } from "../../components/header/header";
import React, { useState } from "react";

export function AddProduct() {

    const [selectedOption, setSelectedOption] = useState("");
    const [showSizeField, setShowSizeField] = useState(false);
    const [showWeightField, setShowWeightField] = useState(false);
    const [showFurnitureFields, setShowFurnitureFields] = useState(false);

    const [sku, setSku] = useState("");
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [size, setSize] = useState("");
    const [weight, setWeight] = useState("");
    const [height, setHeight] = useState("");
    const [width, setWidth] = useState("");
    const [length, setLength] = useState("");


    const handleSelectOption = (event) => {
        setSelectedOption(event.target.value);
        if (event.target.value === "dvd") {
            setShowSizeField(true);
            setShowWeightField(false);
            setShowFurnitureFields(false);
        } else if (event.target.value === "book") {
            setShowSizeField(false);
            setShowWeightField(true);
            setShowFurnitureFields(false);
        } else if (event.target.value === "furniture") {
            setShowSizeField(false);
            setShowWeightField(false);
            setShowFurnitureFields(true);
        }
    };

    function handleSubmit(event) {
        event.preventDefault();

        console.log(sku, name, price, selectedOption, size, weight, height, width, length);
    }


    return (
        <>
            <Header title="Product Add" value="SAVE" context="CANCEL" isLink={false} isDelete={false} />
            <form id="product_form" onSubmit={handleSubmit}>
                <div className="group-input">
                    <label htmlFor="sku">SKU</label>
                    <input type="text" id="sku" value={sku} name="sku" onChange={(e) => setSku(e.target.value)} required />
                </div>
                <div className="group-input">
                    <label htmlFor="name">Name</label>
                    <input type="text" id="name" value={name} name="name" onChange={(e) => setName(e.target.value)} required />
                </div>
                <div className="group-input">
                    <label htmlFor="price">Price</label>
                    <input type="number" min="1" value={price} id="price" name="price" onChange={(e) => setPrice(e.target.value)} required />
                </div>
                <div className="group-input">
                    <label htmlFor="productType">Type Switcher</label>
                    <select id="productType" value={selectedOption} onChange={handleSelectOption}>
                        <option value="">Type Switcher</option>
                        <option value="dvd">DVD</option>
                        <option value="book">Book</option>
                        <option value="furniture">Furniture</option>
                    </select>
                </div>
                {showSizeField ? (
                    <>
                        <div className="group-input">
                            <label htmlFor="size">Size (MB)</label>
                            <input type="number" min="1" id="size" value={size} name="size" onChange={(e) => setSize(e.target.value)} required />
                        </div>
                        <p className="info-type-product">Please, provide disc space in MB.</p>
                    </>
                ) : null}
                {showWeightField ? (
                    <>
                        <div className="group-input">
                            <label htmlFor="weight">Weight (kg)</label>
                            <input type="number" min="1" id="weight" value={weight} name="weight" onChange={(e) => setWeight(e.target.value)} required />
                        </div>
                        <p className="info-type-product">Please, provide weight in Kg.</p>
                    </>
                ) : null}
                {showFurnitureFields ? (
                    <>
                        <div>
                            <div className="group-input">
                                <label htmlFor="height">Height (cm)</label>
                                <input type="number" min="1" id="height" value={height} name="height" onChange={(e) => setHeight(e.target.value)} required />
                            </div>
                            <div className="group-input">
                                <label htmlFor="width">Width (cm)</label>
                                <input type="number" min="1" id="width" value={width} name="width" onChange={(e) => setWidth(e.target.value)} required />
                            </div>
                            <div className="group-input">
                                <label htmlFor="length">Length (cm)</label>
                                <input type="number" min="1" id="length" value={length} name="length" onChange={(e) => setLength(e.target.value)} required />
                            </div>
                        </div>
                        <p className="info-type-product">Please, provide dimensions in HxWxL format.</p>
                    </>
                ) : null}
                    <input type="submit" value="enviar"/>
            </form>
            {/*  <Footer context="Scandiweb Test assignment"/> */}
        </>
    )
}