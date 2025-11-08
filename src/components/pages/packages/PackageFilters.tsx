"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const travelTypes = ["Adventure", "Honeymoon", "Cultural", "Trekking", "Safari"];

export default function PackageFilters() {
  const [priceRange, setPriceRange] = useState([5000]);
  const [duration, setDuration] = useState([14]);

  return (
    <Card className="sticky top-20">
      <CardHeader>
        <CardTitle>Filter Packages</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <Label htmlFor="destination">Destination</Label>
          <Input id="destination" placeholder="e.g., Maldives, Italy" />
        </div>

        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <Label htmlFor="price">Max Price</Label>
            <span className="text-sm font-medium text-primary">${priceRange[0].toLocaleString()}</span>
          </div>
          <Slider
            id="price"
            min={500}
            max={10000}
            step={100}
            value={priceRange}
            onValueChange={setPriceRange}
          />
        </div>

        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <Label htmlFor="duration">Max Duration</Label>
            <span className="text-sm font-medium text-primary">{duration[0]} Days</span>
          </div>
          <Slider
            id="duration"
            min={1}
            max={30}
            step={1}
            value={duration}
            onValueChange={setDuration}
          />
        </div>

        <div className="space-y-4">
          <Label>Travel Type</Label>
          <div className="space-y-2">
            {travelTypes.map((type) => (
              <div key={type} className="flex items-center space-x-2">
                <Checkbox id={`type-${type}`} />
                <label
                  htmlFor={`type-${type}`}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {type}
                </label>
              </div>
            ))}
          </div>
        </div>

        <Button className="w-full">Apply Filters</Button>
      </CardContent>
    </Card>
  );
}
