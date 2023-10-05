import { forwardRef } from 'react';
import { Link as RouterLink } from 'react-router-dom';

/**
 * @param {Omit<import('react-router-dom').LinkProps, 'to'> & {href: import('react-router-dom').LinkProps['to']}} props
 * @param {import('react').Ref<HTMLAnchorElement>} ref
 */
function ForwardedLinkBehavior(props, ref) {
	const { href, ...other } = props;
	return <RouterLink ref={ref} to={href} {...other} />;
}

export const LinkBehavior = forwardRef(ForwardedLinkBehavior);
