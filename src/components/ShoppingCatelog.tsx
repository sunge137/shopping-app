// "use client";

// import Card from "@mui/material/Card";
// import CardActionArea from "@mui/material/CardActionArea";
// import CardContent from "@mui/material/CardContent";
// import CardMedia from "@mui/material/CardMedia";
// import Typography from "@mui/material/Typography";
import { IShoppingItemEntity } from "@model/ShoppingItem";

function ShoppingCatelog({
  items,
}: Readonly<{
  items: IShoppingItemEntity[];
}>) {
  return (
    <div className="w-full p-6 bg-white dark:bg-zinc-950 rounded-lg shadow border border-zinc-200 dark:border-zinc-800">
      <div className="grid grid-cols-[repeat(auto-fill,240px)] gap-4 max-w-full mx-auto" style={{ justifyContent: "start" }}>
        {items.map((item, index) => (
          <div
            key={index + item.name}
            className="w-[240px] h-[240px] bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-50 border border-zinc-200 dark:border-zinc-700 overflow-hidden flex flex-col justify-between items-stretch transition-all duration-200 ease-in-out hover:bg-zinc-50 dark:hover:bg-zinc-800/50 active:scale-[0.99]"
          >
            <div className="p-4 flex-1 flex flex-col justify-start overflow-hidden">
              <h3 className="line-clamp-2 text-sm font-medium leading-snug break-words text-zinc-900 dark:text-zinc-50">
                {item.name}
              </h3>
            </div>

            <div className="p-4 pt-0 shrink-0">
              <p className="text-sm font-bold text-blue-700 dark:text-blue-200">
                {item.price}
              </p>
            </div>
          </div>
        ))}
        {}
      </div>
    </div>
  );
}

export default ShoppingCatelog;

/*
        {items.map((item, index) => (
          <Card
            key={index + item.name}
            sx={{ width: 260, height: 320 }}
            className="bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-50 border border-zinc-200 dark:border-zinc-700 overflow-hidden flex flex-col"
          >
            <CardActionArea className="h-full flex flex-col justify-between items-stretch overflow-hidden">
              <div className="overflow-hidden flex flex-col flex-1">
                <CardMedia
                  component="img"
                  image={item.image}
                  alt={item.name}
                  sx={{ height: 140, minHeight: 140, maxHeight: 140 }}
                  className="w-full object-cover"
                />
                <CardContent className="overflow-hidden flex-1 flex flex-col justify-start">
                  <Typography
                    gutterBottom
                    variant="h6"
                    component="div"
                    className="line-clamp-2 text-sm font-medium leading-snug break-words text-zinc-900 dark:text-zinc-50"
                  >
                    {item.name}
                  </Typography>
                </CardContent>
              </div>
              <CardContent className="pt-0 shrink-0">
                <Typography variant="body2" className="font-bold text-blue-700 dark:text-blue-200">
                  {item.price}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        ))}
*/
