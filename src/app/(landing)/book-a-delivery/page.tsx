import { BookADeliveryForm } from "@/components/delivery/book-a-delivery-form";

function BookaDeliveryPage() {
  return (
    <main className="min-h-screen flex justify-center items-start py-10 px-4">
      <div className="w-full max-w-screen-xl">
        <BookADeliveryForm />
      </div>
    </main>
  );
}

export default BookaDeliveryPage;
