import Image from 'next/image';
import KnightsTour from '@/app/ui/simulations/knightsTour';

export default function Page() {
  return (
    <main>
      <h1 className="text-center text-xl font-bold sm:text-2xl lg:text-4xl xl:text-5xl my-4 xl:mt-0 xl:mb-8 lg:mt-0">
        Проблем коњичког скока
      </h1>
      <article className="text-justify px-4 md:px-16 xl:px-32 text-base">
        <p className="first-letter:float-start first-letter:text-5xl xl:first-letter:text-7xl first-letter:me-3 first-letter:font-bold text-lg md:text-xl lg:text-xl xl:text-3xl mb-5">
          Да ли је могуће коњем обићи свако поље шаховске табле тако да се свако поље обиђе тачно
          једанпут? Ово је питање које лежи у основи проблема коњичког скока (Knight&apos;s tour
          problem).
        </p>
        <p className="mb-2">
          Овај проблем се може проширити додавањем још једног услова, да се пут мора завршити на
          пољу са ког се коњ може поново вратити на почетно поље. Овакав пут, назива се затвореним,
          у супротном пут је отворен.
        </p>
        <figure className="hidden sm:float-left sm:me-10 sm:mb-0 sm:flex sm:flex-col sm:items-center sm:gap-2">
          <Image src="/ojler.jpg" alt="Леонард Ојлер" width={180} height={233} />
          <figcaption className="text-center text-sm italic">Леонард Ојлер</figcaption>
        </figure>
        <p className="mb-2">
          Проблем датира још од деветог века, када су га изучавали источњачки мислиоци, али је прву
          формалну анализу овог проблема дао{' '}
          <a
            className="underline text-blue-700"
            href="https://sr.wikipedia.org/sr-ec/%D0%9B%D0%B5%D0%BE%D0%BD%D0%B0%D1%80%D0%B4_%D0%9E%D1%98%D0%BB%D0%B5%D1%80"
          >
            Леонард Ојлер
          </a>
          &nbsp;1759. (&#8222;Решење радозналог питања које изгледа не подлеже никаквој
          анализи&#8221;).
        </p>
        <figure className="sm:hidden mx-auto mb-2 flex items-center flex-col gap-2">
          <Image src="/ojler.jpg" alt="Леонард Ојлер" width={180} height={233} />
          <figcaption className="text-center text-sm italic">Леонард Ојлер</figcaption>
        </figure>
        <figure className="hidden sm:float-right sm:ms-10 sm:mb-0 sm:flex sm:flex-col sm:items-center sm:gap-2">
          <Image src="/warnsdorff.png" width={240} height={240} alt="Ворнсдорфово правило" />
          <figcaption className="text-center text-sm italic w-60">
            Бројеви на пољима представљају број могућих потеза са тих поља
          </figcaption>
        </figure>
        <p className="mb-2">
          Након Ојлера, разни математичари бавили су се овим проблемом. Значајно је напоменути
          Ворнсдорфово правило, први пут описано 1823. године у&nbsp;
          <i>Des Rösselsprunges einfachste und allgemeinste Lösung</i> (
          <i>Најједноставније и најопштије решење коњичког скока</i>). Ово правило представља једну
          хеуристику за решавање поменутог проблема. Правило налаже да коња увек треба померити на
          поље које има најмањи број могућности за даље померање. Наравно, могуће је доћи до
          ситуације у којој постоје поља са једнаким бројем могућности, у случају одабира погрешног
          поља, не долази се до решења, већ је потребно враћање назад и бирање другог поља. Из тог
          разлога се ово правило назива хеуристиком. Упркос томе, ово правило је корисно за тражење
          пута помоћу рачунара. Разлог је што за разлику од човека, рачунар може брже испитати
          различите могућности и вратити се назад ако дође до неуспеха, што се у програмирању назива
          бектрекинг.
        </p>
        <figure className="sm:hidden mx-auto mb-2 flex items-center flex-col gap-2">
          <Image src="/warnsdorff.png" width={240} height={240} alt="Ворнсдорфово правило" />
          <figcaption className="text-center text-sm italic">
            Бројеви на пољима представљају број могућих потеза са тих поља
          </figcaption>
        </figure>
        <p className="mb-2">
          Уколико шаховску таблу посматрамо као граф, онда се овај проблем може посматрати као
          проблем проналаска Хамилтоновог пута, односно циклуса. Хамилтонов пут (циклус) је пут
          (циклус) у графу који сваки чвор посећује тачно једном.
        </p>
        <p>Доступна је и анимација проблема:</p>
      </article>
      <div className="flex justify-center my-10">
        <KnightsTour coordinates={true} />
      </div>
    </main>
  );
}
