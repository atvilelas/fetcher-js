export default function renderProp(children, props) {
  if (typeof children === 'function') {
    return children(props);
  }

  return children;
}
