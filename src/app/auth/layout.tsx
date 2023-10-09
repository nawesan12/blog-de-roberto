export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <section>
      <h1 className="text-7xl font-semibold">Blog de Roberto - Auth</h1>

      {children}
    </section>
  );
}
