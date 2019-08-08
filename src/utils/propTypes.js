import PropTypes from 'prop-types';

const propTypes = {
  children: PropTypes.oneOfType([PropTypes.func, PropTypes.node]),
  pending: PropTypes.bool.isRequired,
  resolved: PropTypes.bool.isRequired,
  rejected: PropTypes.bool.isRequired,
  settled: PropTypes.bool.isRequired
};

export default propTypes;
