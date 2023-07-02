import "../style.css";

function About() {
  const date = new Date();
  const year = date.getFullYear() - 1996;
  const month = date.getMonth() - 10;
  const day = date.getDate() - 5;
  return (
    <div className="about-content">
      <h1>A little bit about me:</h1>
      <p>My name is Johan</p>
      <p>
        I am {month < 0 || (month >= 0 && day > 0) ? year - 1 : year} years old
      </p>
      <p>I look like this:</p>
      <img src="johan.jpg" height="300" width="250" alt={"me"} />
    </div>
  );
}

export default About;
