import React from 'react';
import MainHeader from '@/components/MainHeader';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle } from 'lucide-react';

const Pricing = () => {
  const plans = [
    {
      name: "Basic",
      price: "$49",
      period: "per month",
      features: [
        "Up to 100 students",
        "10 courses",
        "Basic analytics",
        "Email support"
      ]
    },
    {
      name: "Pro",
      price: "$99",
      period: "per month",
      features: [
        "Up to 500 students",
        "Unlimited courses",
        "Advanced analytics",
        "24/7 support",
        "Custom branding",
        "API access"
      ]
    },
    {
      name: "Enterprise",
      price: "Custom",
      period: "contact us",
      features: [
        "Unlimited students",
        "Unlimited courses",
        "Custom features",
        "Dedicated support",
        "SLA guarantee",
        "Custom integrations"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F8F9FF] to-white pt-16">
      <MainHeader />
      <div className="container mx-auto px-4 py-20">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl font-bold text-[#1A1F2C] mb-6">
            Simple, Transparent Pricing
          </h1>
          <p className="text-gray-600 text-lg">
            Choose the perfect plan for your institution's needs
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <Card key={index} className={`border-[#9b87f5]/10 hover:border-[#9b87f5]/30 transition-all hover:shadow-lg ${index === 1 ? 'border-[#9b87f5]' : ''}`}>
              <CardHeader className="text-center pb-0">
                <CardTitle className="text-2xl">{plan.name}</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="text-center mb-6">
                  <div className="text-4xl font-bold text-[#1A1F2C]">{plan.price}</div>
                  <div className="text-gray-500">{plan.period}</div>
                </div>
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-[#9b87f5]" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button className="w-full bg-[#9b87f5] hover:bg-[#8a74f8]">
                  Get Started
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Pricing;