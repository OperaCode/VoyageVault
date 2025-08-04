import React from "react";

const EmergencyInfo = () => {
  return (
    <div id="emergency-panel" role="tabpanel">
      <h3 className="text-2xl font-semibold text-amber-600 mb-4">
        Emergency Info
      </h3>
      <ul className="text-sm text-gray-600">
        <li>
          <strong>Emergency:</strong> 112
        </li>
        <li>
          <strong>Hotel:</strong> +33 1 23 45 67 89
        </li>
        <li>
          <strong>Embassy:</strong> +33 1 43 12 34 56
        </li>
      </ul>
    </div>
  );
};

export default EmergencyInfo;
