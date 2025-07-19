import React, { useEffect, useContext, useState } from 'react'
import { ProductContext } from '../../context/ProductContext'
import './AdminView.scss'

const AdminView = () => {
    const {
        products,
        getAllProducts,
        createProduct,
        deleteProduct,
        updateProduct,
        getProductById,
        product
    } = useContext(ProductContext)

    const [isEditModalOpen, setIsEditModalOpen] = useState(false)
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
    const [currentProductId, setCurrentProductId] = useState(null)
    const [formData, setFormData] = useState({
        name: '',
        price: '',
    })

    useEffect(() => { getAllProducts() }, [])

    useEffect(() => {
        if (product) {
            setFormData({
                name: product.name || '',
                price: product.price || '',
            })
        }
    }, [product])

    const handleOpenEditModal = async (id) => {
        setCurrentProductId(id)
        await getProductById(id)
        setIsEditModalOpen(true)
    }

    const handleOpenCreateModal = () => {
        setIsCreateModalOpen(true)
    }

    const handleCloseModal = () => {
        setIsEditModalOpen(false)
        setIsCreateModalOpen(false)
        setFormData({ name: '', price: '' })
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    const handleCreateSubmit = async (e) => {
        e.preventDefault()
        try {
            await createProduct(formData)
            getAllProducts()
            handleCloseModal()
        } catch (error) {
            console.error("Create error:", error)
        }
    }

    const handleUpdateSubmit = async (e) => {
        e.preventDefault()
        try {
            await updateProduct(currentProductId, formData)
            getAllProducts()
            handleCloseModal()
        } catch (error) {
            console.error("Update error:", error)
        }
    }

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm('¿Estás seguro que deseas eliminar este producto?')
        if (confirmDelete) {
            try {
                await deleteProduct(id)
            } catch (error) {
                console.error("Delete error:", error)
            }
        }
    }

    return (
        <div className='adminPage'>
                <button
                    onClick={handleOpenCreateModal}
                    className="create-btn"
                >
                    + Crear producto
                </button>

            <div className="productList">
                {products?.map(product => (
                    <div className="__product" key={product.id}>
                        <div className="__adminOptions">
                            <button className='btnEdit' onClick={() => handleOpenEditModal(product.id)}></button>
                            <button className='btnDelete' onClick={() => handleDelete(product.id)}></button>
                        </div>
                        <img src="./movil.png" alt={product.name} />
                        <div className="__productInfo">
                            <p>{product.name}</p>
                            <span>${product.price}</span>
                        </div>

                    </div>
                ))}
            </div>

            {isEditModalOpen && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <span className="modal-close" onClick={handleCloseModal}>&times;</span>
                        <h2>Editar Producto</h2>
                        <form onSubmit={handleUpdateSubmit}>
                            <div className="form-group">
                                <label>Nombre:</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Precio:</label>
                                <input
                                    type="number"
                                    name="price"
                                    value={formData.price}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>

                            <button type="submit" className="save-button">
                                Guardar Cambios
                            </button>
                        </form>
                    </div>
                </div>
            )}

            {isCreateModalOpen && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <span className="modal-close" onClick={handleCloseModal}>&times;</span>
                        <h2>Crear Nuevo Producto</h2>
                        <form onSubmit={handleCreateSubmit}>
                            <div className="form-group">
                                <label>Nombre:</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Precio:</label>
                                <input
                                    type="number"
                                    name="price"
                                    value={formData.price}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>

                            <button type="submit" className="save-button">
                                Crear Producto
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}

export default AdminView