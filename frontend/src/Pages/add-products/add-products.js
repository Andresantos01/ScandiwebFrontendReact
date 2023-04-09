import './add-product.scss';
import { Footer } from "../../components/footer/footer";
import { Header } from "../../components/header/header";
import React, { useState } from "react";
import axios from "axios";

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
    const [message, setMessage] = useState("");

    const [skuMessage, setSkuMessage] = useState("");
    const [nameMessage, setNameMessage] = useState("");
    const [priceMessage, setPriceMessage] = useState("");
    const [sizeMessage, setSizeMessage] = useState("");
    const [weightMessage, setWeightMessage] = useState("");
    const [heightMessage, setHeightMessage] = useState("");
    const [widthMessage, setWidthMessage] = useState("");
    const [lengthMessage, setLengthMessage] = useState("");

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

    function handleSubmitForm(event) {
        event.preventDefault();
        const messageDisplay = "Please, provide the data of indicated type";

        if (sku === "" || name === "" || price === "" || selectedOption === "") {
            setMessage("Please, submit required data");
            return;
        }
        const fields = {
            sku: { validation: /^[A-Za-z0-9-]*$/, message: messageDisplay, setter: setSkuMessage, value: sku },
            name: { validation: /^[A-Za-z0-9áéíóúâêîôûàèìòùãõç\s-]*$/, message: messageDisplay, setter: setNameMessage, value: name },
            price: { validation: /^[1-9]\d*(\.[0-9]*[1-9])?$|^0\.[0-9]*[1-9]$/, message: messageDisplay, setter: setPriceMessage, value: price },
            weight: { validation: selectedOption === "book" ? /^[1-9]\d*(\.[0-9]*[1-9])?$|^0\.[0-9]*[1-9]$/ : undefined, message: messageDisplay, setter: setWeightMessage, value: weight },
            size: { validation: selectedOption === "dvd" ? /^[1-9]\d*(\.[0-9]*[1-9])?$|^0\.[0-9]*[1-9]$/ : undefined, message: messageDisplay, setter: setSizeMessage, value: size },
            height: { validation: selectedOption === "furniture" ? /^[1-9]\d*(\.[0-9]*[1-9])?$|^0\.[0-9]*[1-9]$/ : undefined, message: messageDisplay, setter: setHeightMessage, value: height },
            width: { validation: selectedOption === "furniture" ? /^[1-9]\d*(\.[0-9]*[1-9])?$|^0\.[0-9]*[1-9]$/ : undefined, message: messageDisplay, setter: setWidthMessage, value: width },
            length: { validation: selectedOption === "furniture" ? /^[1-9]\d*(\.[0-9]*[1-9])?$|^0\.[0-9]*[1-9]$/ : undefined, message: messageDisplay, setter: setLengthMessage, value: length },
        };

        for (const [field, { validation, message, setter, value }] of Object.entries(fields)) {
            if (validation && !validation.test(value)) {
                setter(message);
                return;
            }
        }



        // console.log([sku, name, price, selectedOption, size, weight, height, width, length]);
    }



    return (
        <>
            <Header title="Product Add" value="SAVE" context="CANCEL" isLink={false} isDelete={false} handleSubmit={handleSubmitForm} />
            <main>
                <form id="product_form" >
                    <div className='group-input'>
                        <p>{message}</p>
                    </div>
                    <div className="group-input">
                        <div className='group'>
                            <label htmlFor="sku">SKU</label>
                            <input type="text" id="sku" value={sku} name="sku" onChange={(e) => setSku(e.target.value)} required />
                        </div>
                        <div className='messages'>
                            <span>{skuMessage}</span>
                        </div>
                    </div>
                    <div className="group-input">
                        <div className='group'>
                            <label htmlFor="name">Name</label>
                            <input type="text" id="name" value={name} name="name" onChange={(e) => setName(e.target.value)} required />
                        </div>
                        <div className='messages'>
                            <span>{nameMessage}</span>
                        </div>
                    </div>
                    <div className="group-input">
                        <div className='group'>
                            <label htmlFor="price">Price</label>
                            <input type="number" min="1" value={price} id="price" name="price" onChange={(e) => setPrice(e.target.value)} required />
                        </div>
                        <div className='messages'>
                            <span>{priceMessage}</span>
                        </div>
                    </div>
                    <div className="group-input">
                        <div className='group'>
                            <label htmlFor="productType">Type Switcher</label>
                            <select id="productType" value={selectedOption} onChange={handleSelectOption}>
                                <option value="">Type Switcher</option>
                                <option value="dvd">DVD</option>
                                <option value="book">Book</option>
                                <option value="furniture">Furniture</option>
                            </select>
                        </div>
                    </div>
                    {showSizeField ? (
                        <>
                            <div className="group-input">
                                <div className='group'>
                                    <label htmlFor="size">Size (MB)</label>
                                    <input type="number" min="1" id="size" value={size} name="size" onChange={(e) => setSize(e.target.value)} required />
                                </div>
                                <div className='messages'>
                                    <span>{sizeMessage}</span>
                                </div>
                            </div>
                            <div className="group-input">
                                <p className="info-type-product">Please, provide disc space in MB.</p>
                            </div>
                        </>
                    ) : null}
                    {showWeightField ? (
                        <>
                            <div className="group-input">
                                <div className='group'>
                                    <label htmlFor="weight">Weight (kg)</label>
                                    <input type="number" min="1" id="weight" value={weight} name="weight" onChange={(e) => setWeight(e.target.value)} required />
                                </div>
                                <div className='messages'>
                                    <span>{weightMessage}</span>
                                </div>
                            </div>
                            <div className="group-input">
                                <p className="info-type-product">Please, provide weight in Kg.</p>
                            </div>
                        </>
                    ) : null}
                    {showFurnitureFields ? (
                        <>
                            <div>
                                <div className="group-input">
                                    <div className='group'>
                                        <label htmlFor="height">Height (cm)</label>
                                        <input type="number" min="1" id="height" value={height} name="height" onChange={(e) => setHeight(e.target.value)} required />
                                    </div>
                                    <div className='messages'>
                                        <span>{heightMessage}</span>
                                    </div>
                                </div>
                                <div className="group-input">
                                    <div className='group'>
                                        <label htmlFor="width">Width (cm)</label>
                                        <input type="number" min="1" id="width" value={width} name="width" onChange={(e) => setWidth(e.target.value)} required />
                                    </div>
                                    <div className='messages'>
                                        <span>{widthMessage}</span>
                                    </div>
                                </div>
                                <div className="group-input">
                                    <div className='group'>
                                        <label htmlFor="length">Length (cm)</label>
                                        <input type="number" min="1" id="length" value={length} name="length" onChange={(e) => setLength(e.target.value)} required />
                                    </div>
                                    <div className='messages'>
                                        <span>{lengthMessage}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="group-input">
                                <p className="info-type-product">Please, provide dimensions in HxWxL format.</p>
                            </div>
                        </>
                    ) : null}

                </form>
            </main>
            <Footer context="Scandiweb Test assignment" />
        </>
    )
}