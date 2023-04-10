import './add-product.scss';
import { Footer } from "../../components/footer/footer";
import { Header } from "../../components/header/header";
import React, { useState } from "react";
import axios from "axios";

export function AddProduct() {

    const [selectedType, setSelectedType] = useState("");
    const [showSizeField, setShowSizeField] = useState(false);
    const [showWeightField, setShowWeightField] = useState(false);
    const [showFurnitureFields, setShowFurnitureFields] = useState(false);

    const [sku, setSku] = useState("");
    const [name, setName] = useState("");   
    const [price, setPrice] = useState("");
    const [sizeValue, setSizeValue] = useState("");
    const [weightValue, setWeightValue] = useState("");
    const [heightValue, setHeightValue] = useState("");
    const [widthValue, setWidthValue] = useState("");
    const [lenghtValue, setLenghtValue] = useState("");
    const [message, setMessage] = useState("");

    const [skuValidationMessage, setSkuValidationMessage] = useState("");
    const [nameValidationMessage, setNameValidationMessage] = useState("");
    const [priceValidationMessage, setPriceValidationMessage] = useState("");
    const [sizeValidationMessage, setSizeValidationMessage] = useState("");
    const [weightValidationMessage, setWeightValidationMessage] = useState("");
    const [heightValidationMessage, setHeightValidationMessage] = useState("");
    const [widthValidationMessage, setWidthValidationMessage] = useState("");
    const [lenghtValidationMessage, setLenghtValidationMessage] = useState("");
    const [skuUniqueValidationMessage, setSkuUniqueValidationMessage] = useState("");
    const [saveProductError, setSaveProductError] = useState("");

    const handleSelectType = (event) => {
        setSelectedType(event.target.value);
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

        if (sku === "" || name === "" || price === "" || selectedType === "") {
            setMessage("Please, submit required data");
            return;
        }
        const fields = {
            sku: { validation: /^[A-Za-z0-9-]*$/, message: messageDisplay, setter: setSkuValidationMessage, value: sku },
            name: { validation: /^[A-Za-z0-9áéíóúâêîôûàèìòùãõç\s-]*$/, message: messageDisplay, setter: setNameValidationMessage, value: name },
            price: { validation: /^[1-9]\d*(\.[0-9]*[1-9])?$|^0\.[0-9]*[1-9]$/, message: messageDisplay, setter: setPriceValidationMessage, value: price },
            weight: { validation: selectedType === "book" ? /^[1-9]\d*(\.[0-9]*[1-9])?$|^0\.[0-9]*[1-9]$/ : undefined, message: messageDisplay, setter: setWeightValidationMessage, value: weightValue },
            size: { validation: selectedType === "dvd" ? /^[1-9]\d*(\.[0-9]*[1-9])?$|^0\.[0-9]*[1-9]$/ : undefined, message: messageDisplay, setter: setSizeValidationMessage, value: sizeValue },
            height: { validation: selectedType === "furniture" ? /^[1-9]\d*(\.[0-9]*[1-9])?$|^0\.[0-9]*[1-9]$/ : undefined, message: messageDisplay, setter: setHeightValidationMessage, value: heightValue },
            width: { validation: selectedType === "furniture" ? /^[1-9]\d*(\.[0-9]*[1-9])?$|^0\.[0-9]*[1-9]$/ : undefined, message: messageDisplay, setter: setWidthValidationMessage, value: widthValue },
            length: { validation: selectedType === "furniture" ? /^[1-9]\d*(\.[0-9]*[1-9])?$|^0\.[0-9]*[1-9]$/ : undefined, message: messageDisplay, setter: setLenghtValidationMessage, value: lenghtValue },
        };

        for (const [, { validation, message, setter, value }] of Object.entries(fields)) {
            if (validation && !validation.test(value)) {
                setter(message);
                return;
            }
        }

        handleSaveProduct();

    }

    async function handleSaveProduct() {
        try {
            const modifiedProduct = {
                weight: `${weightValue} Kg`,
                size: ` ${sizeValue} MB`,
                dimension: `${heightValue}x${widthValue}x${lenghtValue}`
            }
            await axios.post(`https://scandiwebtestdevjr.herokuapp.com/addProduct`, {
                sku: sku,
                name: name,
                price: price,
                type: selectedType,
                ...(selectedType === 'book' && { weight: modifiedProduct.weight }),
                ...(selectedType === 'dvd' && { size: modifiedProduct.size }),
                ...(selectedType === 'furniture' && { dimension: modifiedProduct.dimension })
            }).then(response => {
                response.data.error_message ? setSkuUniqueValidationMessage("Product SKU must be unique. This already exists, try again with a new one") : window.location.href = '/';
            })
         
        } catch (error) {
            setSaveProductError("Error save product");
        }
    }


    return (
        <>
            <Header title="Product Add" value="Save" context="Cancel" isLink={false} isDelete={false} handleSubmit={handleSubmitForm} />
            <main>
                <form id="product_form" >
                    <div className='group-input'>
                        <p>{saveProductError}</p>
                        <p>{message}</p>
                        <p>{skuUniqueValidationMessage}</p>
                    </div>
                    <div className="group-input">
                        <div className='group'>
                            <label htmlFor="sku">SKU</label>
                            <input type="text" id="sku" value={sku} name="sku" onChange={(e) => setSku(e.target.value)} required />
                        </div>
                        <div className='messages'>
                            <span>{skuValidationMessage}</span>
                        </div>
                    </div>
                    <div className="group-input">
                        <div className='group'>
                            <label htmlFor="name">Name</label>
                            <input type="text" id="name" value={name} name="name" onChange={(e) => setName(e.target.value)} required />
                        </div>
                        <div className='messages'>
                            <span>{nameValidationMessage}</span>
                        </div>
                    </div>
                    <div className="group-input">
                        <div className='group'>
                            <label htmlFor="price">Price</label>
                            <input type="number" min="1" value={price} id="price" name="price" onChange={(e) => setPrice(e.target.value)} required />
                        </div>
                        <div className='messages'>
                            <span>{priceValidationMessage}</span>
                        </div>
                    </div>
                    <div className="group-input">
                        <div className='group'>
                            <label htmlFor="productType">Type Switcher</label>
                            <select id="productType" value={selectedType} onChange={handleSelectType}>
                                <option value=""></option>
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
                                    <input type="number" min="1" id="size" value={sizeValue} name="size" onChange={(e) => setSizeValue(e.target.value)} required />
                                </div>
                                <div className='messages'>
                                    <span>{sizeValidationMessage}</span>
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
                                    <input type="number" min="1" id="weight" value={weightValue} name="weight" onChange={(e) => setWeightValue(e.target.value)} required />
                                </div>
                                <div className='messages'>
                                    <span>{weightValidationMessage}</span>
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
                                        <input type="number" min="1" id="height" value={heightValue} name="height" onChange={(e) => setHeightValue(e.target.value)} required />
                                    </div>
                                    <div className='messages'>
                                        <span>{heightValidationMessage}</span>
                                    </div>
                                </div>
                                <div className="group-input">
                                    <div className='group'>
                                        <label htmlFor="width">Width (cm)</label>
                                        <input type="number" min="1" id="width" value={widthValue} name="width" onChange={(e) => setWidthValue(e.target.value)} required />
                                    </div>
                                    <div className='messages'>
                                        <span>{widthValidationMessage}</span>
                                    </div>
                                </div>
                                <div className="group-input">
                                    <div className='group'>
                                        <label htmlFor="lenght">Length (cm)</label>
                                        <input type="number" min="1" id="lenght" value={lenghtValue} name="length" onChange={(e) => setLenghtValue(e.target.value)} required />
                                    </div>
                                    <div className='messages'>
                                        <span>{lenghtValidationMessage}</span>
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