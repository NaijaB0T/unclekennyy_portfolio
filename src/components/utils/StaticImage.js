'use client';

// This helper file replaces Next.js Image component with standard img tag

export const StaticImage = ({ 
  src, 
  alt, 
  width, 
  height, 
  className = '',
  priority = false,
  ...rest 
}) => {
  return (
    <img
      src={src}
      alt={alt || ''}
      className={className}
      loading={priority ? 'eager' : 'lazy'}
      {...rest}
      style={{
        maxWidth: '100%',
        height: 'auto',
        ...rest.style
      }}
    />
  );
};

export default StaticImage;
