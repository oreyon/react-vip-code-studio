import { Link } from 'react-router-dom';
import Button from '../Elements/Button/Button.tsx';
import React from 'react';

type CardProductProps = {
	children?: React.ReactNode;
};

const CardProduct = (props: CardProductProps) => {
	return (
		<div className='w-full max-w-xs bg-gray-800 border border-gray-700 rounded-lg shadow mx-3 my-2 flex flex-col justify-between'>
			{props.children}
		</div>
	);
};

type CardHeaderProps = {
	idProps: number;
	hrefProps: string;
	srcProps: string;
	altProps: string;
};

const CardHeader = (props: CardHeaderProps) => {
	return (
		<Link to={`/products/${props.idProps}`} className='block'>
			<img
				src={props.srcProps}
				alt={props.altProps}
				className='p-8 rounded-t-lg h-60 w-full object-cover'
			/>
		</Link>
	);
};

type CardBodyProps = {
	titleProps: string;
	children?: React.ReactNode;
};

const CardBody = (props: CardBodyProps) => {
	return (
		<div className='px-5 pb-5 h-full'>
			<a href=''>
				<h5 className='text-xl font-semibold tracking-tight text-white'>
					{props.titleProps.substring(0, 20)} . . .
				</h5>
				<p className='text-s text-white'>
					{typeof props.children === 'string'
						? props.children.substring(0, 50)
						: ''}{' '}
					. . .
				</p>
			</a>
		</div>
	);
};

type CardFooterProps = {
	idProps: number;
	priceProps: number;
	addToCartProps?: () => void;
	buyNowProps?: () => void;
};

const CardFooter = (props: CardFooterProps) => {
	return (
		<div className='flex items-center justify-between px-5 pb-5'>
			<span className={'text-xl font-bold text-white'}>
				{props.priceProps.toLocaleString('en-US', {
					style: 'currency',
					currency: 'USD',
					maximumFractionDigits: 0,
				})}
			</span>
			<Button className='bg-blue-600' onClick={props.addToCartProps}>
				Add To Cart
			</Button>
		</div>
	);
};

CardProduct.Header = CardHeader;
CardProduct.Body = CardBody;
CardProduct.Footer = CardFooter;

export default CardProduct;
