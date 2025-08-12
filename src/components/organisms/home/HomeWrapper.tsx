import HomeComunity from "./HomeComunity";
import HomeFAQ from "./HomeFAQ";
import HomeIntroduction from "./HomeIntroduction";
import HomeJumbotron from "./HomeJumbotron";
import HomeScreeningInvitation from "./HomeScreeningInvitation";

export default function HomeWrapper() {
  return (
    <div className="pad-x-xl space-y-1 md:space-y-2">
      <HomeJumbotron />
      <HomeIntroduction />
      <HomeScreeningInvitation />
      <HomeComunity />
      <HomeFAQ />
    </div>
  );
}
