import clsx from 'clsx';

const TableMacro = ({ children, className, ...props }) => (
  <div className={clsx('table-wrapper', className)}>
    <table {...props}>{children}</table>
  </div>
);

export default TableMacro;