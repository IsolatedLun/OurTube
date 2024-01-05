export default function Numeric({ n, options } : { n: number, options?: Intl.NumberFormatOptions }) {
    options = options ?? { 
		notation: 'compact', maximumSignificantDigits: 1 
	};

    return (
        <span>
            {Intl.NumberFormat('en', options).format(n)}
        </span>
    )
}