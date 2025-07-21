import React, { useContext, useEffect, useState } from 'react';
import { ProductContext } from '../../context/ProductContext';
import { useParams } from 'react-router-dom';
import './ProductDetails.scss';

const ProductDetails = () => {
    const { product, getProductById, createReview } = useContext(ProductContext);
    const [reviews, setReviews] = useState([]);
    const [reviewText, setReviewText] = useState('');
    const [error, setError] = useState('');
    
    const params = useParams();

    useEffect(() => {
        getProductById(params.productId);
    }, [params.productId]);

    const handleSubmitReview = async (e) => {
        e.preventDefault();
        setError('');
        
        if (reviewText.length < 50 || reviewText.length > 500) {
            setError('La reseña debe tener entre 50 y 500 caracteres');
            return;
        }

        try {
            const reviewData = {
                reviewText: reviewText,
                ProductId: params.productId,
                UserId: localStorage.getItem('userId')
            };
            
            const result = await createReview(reviewData);
            setReviews([...reviews, {
                ...result.review,
            }]);
            setReviewText('');
        } catch (err) {
            setError(err.message || 'Error al enviar la reseña');
        }
    };

    return (
        <>
            <div className='productData'>
                <img src="../movil.png" alt={product.name} />
                <div className='__content'>
                    <h1>{product.name}</h1>
                    <p>{product.price}€</p>
                </div>
            </div>
            
            <div className="reviews-section">
                <h2>Reseñas</h2>
                
                {error && <div className="error-message">{error}</div>}
                
                {reviews.length === 0 ? (
                    <p>No hay reseñas todavía. ¡Sé el primero en opinar!</p>
                ) : (
                    <ul className="reviews-list">
                        {reviews.map((review, index) => (
                            <li key={index} className="review-item">
                                <div className="review-author">
                                    {review.User?.name || 'Usuario anónimo'}
                                </div>
                                <p className="review-text">{review.reviewText}</p>
                                <small className="review-date">
                                    {new Date(review.createdAt).toLocaleDateString()}
                                </small>
                            </li>
                        ))}
                    </ul>
                )}
                
                <form onSubmit={handleSubmitReview} className="review-form">
                    <h3>Deja tu reseña</h3>
                    <div className="form-group">
                        <label>Tu reseña:</label>
                        <textarea
                            value={reviewText}
                            onChange={(e) => setReviewText(e.target.value)}
                            required
                            minLength={50}
                            maxLength={500}
                            rows={5}
                            placeholder="Escribe tu reseña (mínimo 50 caracteres)..."
                        />
                        <div className="character-count">
                            {reviewText.length}/500 caracteres
                        </div>
                    </div>
                    <button type="submit" className="btnResena">
                        Enviar reseña
                    </button>
                </form>
            </div>
        </>
    );
};

export default ProductDetails;