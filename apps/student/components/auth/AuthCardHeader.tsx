type AuthCardHeaderProps = {
  title: string;
  description: string;
};

export function AuthCardHeader({ title, description }: AuthCardHeaderProps) {
  return (
    <>
      <h1 className="text-3xl">{title}</h1>
      <p className="student-muted-text mt-2 text-sm">{description}</p>
    </>
  );
}
