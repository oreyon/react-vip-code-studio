import Button from '../Elements/Button/Button.tsx';
import React from 'react';

type CardProductProps = {
	children?: React.ReactNode;
};

const CardProduct = (props: CardProductProps) => {
	return (
		<div className='w-full max-w-sm bg-gray-800 border border-gray-700 rounded-lg shadow mx-2 flex flex-col justify-between'>
			{props.children}
		</div>
	);
};

type CardHeaderProps = {
	hrefProps: string;
	srcProps: string;
	altProps: string;
};

const CardHeader = (props: CardHeaderProps) => {
	return (
		<a href={props.hrefProps}>
			<img
				src={props.srcProps}
				alt={props.altProps}
				className='p-8 rounded-t-lg'
			/>
		</a>
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
					{props.titleProps}
				</h5>
				<p className='text-s text-white'>{props.children}</p>
			</a>
		</div>
	);
};

type CardFooterProps = {
	priceProps: string;
};

const CardFooter = (props: CardFooterProps) => {
	return (
		<div className='flex items-center justify-between px-5 pb-5'>
			<span className={'text-xl font-bold text-white'}>{props.priceProps}</span>
			<Button classNameProps={'bg-blue-600'}>Add To Cart</Button>
		</div>
	);
};

CardProduct.Header = CardHeader;
CardProduct.Body = CardBody;
CardProduct.Footer = CardFooter;

export default CardProduct;
