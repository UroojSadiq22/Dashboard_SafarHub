import { mockPackages } from "@/lib/mock-data";
import PackageCard from "@/components/shared/PackageCard";
import PackageFilters from "@/components/pages/packages/PackageFilters";

export default function PackagesPage() {
  return (
    <div className="container py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
          Explore Our Travel Packages
        </h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
          From relaxing beach getaways to thrilling mountain treks, find the perfect pre-built itinerary for your next adventure.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
        <aside className="lg:col-span-1">
          <PackageFilters />
        </aside>
        <main className="lg:col-span-3">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {mockPackages.map((pkg) => (
              <PackageCard key={pkg.id} pkg={pkg} />
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
