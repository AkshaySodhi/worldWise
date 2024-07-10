import PageNav from "../components/PageNav";
import styles from "./Product.module.css";

export default function Product() {
  return (
    <main className={styles.product}>
      <PageNav />

      <section>
        <img
          src="img-1.jpg"
          alt="person with dog overlooking mountain with sunset"
        />
        <div>
          <h2>About WorldWise.</h2>
          <p>
            Founded with a passion for exploration, our company specializes in
            innovative travel solutions designed to enhance your journey
            experiences. We aim to simplify the way you plan, track, and cherish
            your adventures through cutting-edge technology and user-friendly
            interfaces.
          </p>
          <p>
            With a dedicated team of travel enthusiasts and tech experts, we are
            committed to delivering top-notch services that inspire and empower
            travelers worldwide. Join us in making every trip unforgettable.
          </p>
        </div>
      </section>
    </main>
  );
}
