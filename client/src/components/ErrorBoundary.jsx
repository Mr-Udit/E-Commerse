import React from "react";
import PropTypes from "prop-types";

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }

    componentDidCatch(error, errorInfo) {
        console.error("ErrorBoundary caught an error:", error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="bg-red-100 text-red-800 p-4 rounded-md mt-4">
                    <h2 className="text-lg font-bold">Something went wrong.</h2>
                    <p>{this.state.error?.message || "Unknown error occurred."}</p>
                </div>
            );
        }

        return this.props.children;
    }
}

ErrorBoundary.propTypes = {
    children: PropTypes.node.isRequired,
};

export default ErrorBoundary;
