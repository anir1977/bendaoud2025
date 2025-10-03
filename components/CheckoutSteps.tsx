interface CheckoutStepsProps {
  currentStep: number;
}

export default function CheckoutSteps({ currentStep }: CheckoutStepsProps) {
  const steps = [
    { id: 1, name: 'Panier', icon: 'ri-shopping-cart-line' },
    { id: 2, name: 'Livraison', icon: 'ri-truck-line' },
    { id: 3, name: 'Paiement', icon: 'ri-secure-payment-line' },
    { id: 4, name: 'Confirmation', icon: 'ri-check-line' }
  ];

  return (
    <div className="bg-white border-b">
      <div className="container mx-auto px-6 py-6">
        <div className="flex items-center justify-between max-w-2xl mx-auto">
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-center">
              <div className="flex flex-col items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-colors ${
                  currentStep >= step.id 
                    ? 'bg-yellow-600 border-yellow-600 text-white' 
                    : 'border-gray-300 text-gray-400'
                }`}>
                  <div className="w-5 h-5 flex items-center justify-center">
                    <i className={step.icon}></i>
                  </div>
                </div>
                <span className={`text-xs mt-2 font-medium ${
                  currentStep >= step.id ? 'text-yellow-600' : 'text-gray-400'
                }`}>
                  {step.name}
                </span>
              </div>
              
              {index < steps.length - 1 && (
                <div className={`w-16 h-0.5 mx-4 ${
                  currentStep > step.id ? 'bg-yellow-600' : 'bg-gray-300'
                }`}></div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}